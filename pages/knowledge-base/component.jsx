import React, {useEffect, useRef, useState} from 'react';
import {getRepositoryRecords} from '../../api/knowledge-base';
import {Card} from 'react-bootstrap';
import base64Util from '../../utils/base64Util';
import {FlexContainer} from "../../components/common/FlexContainer";
import {InputText} from "primereact/inputtext";
import {useTranslation} from "react-i18next";

const KnowledgeBase = () => {
    const {t} = useTranslation();
    const searchBox = useRef();

    const [repositoryRecords, setRepositoryRecords] = useState([]);

    useEffect(() => {
        const fetchAllRecords = async () => await getRepositoryRecords();
        fetchAllRecords().then(setRepositoryRecords);
    }, []);

    return (
        <div className="text-center">
            <div className="mb-5">
                <span className="p-float-label">
                  <InputText type={'email'} ref={searchBox} className="w-100"/>
                  <label>{t('search')}</label>
                </span>
            </div>
            <FlexContainer>
                {repositoryRecords?.map(record => (
                    <Card className='col-2 m-5' key={record.id}>
                        <Card.Img variant="top" src={base64Util(record.attachment)}/>
                        <Card.Body>
                            <Card.Title>{record.title}</Card.Title>
                            <Card.Text className='text-dark'>{record.content}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </FlexContainer>
        </div>
    );
};

export default KnowledgeBase;