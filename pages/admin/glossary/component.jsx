import React, { useEffect, useState } from 'react';
import { getGlossaryById } from '../../../api/glossary';
import toggleGlossaryById from '../../../api/glossary/toggle';

function Glossary() {
  const [glossary, setGlossary] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGlossaryById(4);
      if (response) setGlossary(response);
    };

    fetchData();
  }, []);

  const toggle = () => {
    toggleGlossaryById(4);
  };

  return (
    <>
      <button type="button" onClick={toggle}>Press</button>
      <pre>
        {glossary.key}
      </pre>
    </>
  );
}

export default Glossary;
