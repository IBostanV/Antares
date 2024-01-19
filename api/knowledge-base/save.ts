import { KNOWLEDGE_BASE_PATH } from '../constant';
import request, { PATCH } from '../../utils/request';
import { KnowledgeBaseRecord } from '../../components/domain/knowledge-base-record';

export default (body: KnowledgeBaseRecord, attachment: any) => {
  const formData = new FormData();

  formData.append('request', new Blob([JSON.stringify(body)], { type: 'application/json' }));

  if (attachment) {
    formData.append('attachment', attachment, attachment.name);
  }

  return request(KNOWLEDGE_BASE_PATH, {
    body: formData,
    method: PATCH,
    withHeaders: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
