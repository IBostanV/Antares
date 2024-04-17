import React, {useEffect, useState} from 'react';
import SockJsClient from 'react-stomp';
import PropTypes from 'prop-types';
import {Button, ButtonGroup, Card} from 'react-bootstrap';
import fetchMessages from '../../api/message';
import {useTranslation} from "react-i18next";
import {getAllUsers} from "../../api/user";
import {Editor} from "primereact/editor";
import {Autoplay, FreeMode, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import Link from "next/link";
import {useRouter} from "next/router";
import getUserGroups from "../../api/user/getUserGroups";
import {Panel} from "primereact/panel";

function Message({hostUrl }) {
  const router = useRouter();
  const { chatId } = router.query;
  const {t} = useTranslation();

  const [input, setInput] = useState(null);
  const [receiver, setReceiver] = useState(null);

  const [users, setUsers] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [clientRef, setClientRef] = useState({sendMessage: (path: string, body: string): void => null});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => await getAllUsers();
    fetchUsers().then(result => {
      setUsers(result.filter((item): boolean => item.name !== undefined));
      setReceiver(chatId);
    });

    const fetchUserGroups = async () => await getUserGroups();
    fetchUserGroups().then(setUserGroups);
  }, [chatId]);

  const onMessage = (message) => setMessages((messages) => [...messages, message]);

  const sendPrivateMessage = () => {
    clientRef.sendMessage('/api/app/private', JSON.stringify({
      content: input,
      destinationId: receiver
    }));
  };

  const history = () => {
    const fetchData = async () => await fetchMessages('/api/message', chatId);
    fetchData()
      .then(response => {
        setLoaded(true);
        if (response) setMessages(response);
      });
  };

  return (
    <>
      {loaded && (
          <div className='mx-auto w-50'>
            <Swiper
                // @ts-ignore
                onSwiper={(swiper: any) => (window.swiper = swiper)}
                freeMode={true}
                slidesPerView={10}
                mousewheel={{
                  forceToAxis: false,
                  sensitivity: 1,
                  releaseOnEdges: true
                }}
                modules={[Pagination, Mousewheel, Navigation, Scrollbar, Keyboard, Autoplay, FreeMode]}
            >
              {userGroups?.map(userGroup => (
                  <SwiperSlide className="cursor-pointer" key={userGroup.name}>
                    <Card>
                      <Card.Text>
                        <Link href={`/chat/${userGroup.groupId}`}>
                          {userGroup.name || userGroup.participantUsername || t('no_username')}
                        </Link>
                      </Card.Text>
                      <Card.Body>
                        <Button>{t('create_group')}</Button>
                      </Card.Body>
                    </Card>
                  </SwiperSlide>
              ))}
            </Swiper>
            <Editor
                value={input}
                onTextChange={(e) => setInput(e.htmlValue)}
                className='my-3'
            />
            <ButtonGroup aria-label="Send message" className="mb-3">
              <Button variant="outline-info" onClick={() => sendPrivateMessage()}>{t('send')}</Button>
            </ButtonGroup>
          </div>
      )}

      {messages?.map((message) => (
          <div key={message.message} className="mb-5 mx-auto w-50">
            <Panel header={message.source + ' ' + message.createdDate}>
              <div dangerouslySetInnerHTML={{ __html: message.content }} />
            </Panel>
          </div>
      ))}

      <SockJsClient
          ref={setClientRef}
          onConnect={history}
          onMessage={onMessage}
          url={`${hostUrl}/api/pq`}
          topics={['/user/solo', '/party/news']}
      />
    </>
  );
}

Message.propTypes = {
  hostUrl: PropTypes.string,
};

export default Message;
