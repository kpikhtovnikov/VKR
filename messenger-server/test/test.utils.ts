import supertest from 'supertest';

export async function sendRequest(
    testSession: supertest.SuperTest<supertest.Test>,
    url: string,
    method: string,
    data: any = null
  ) {
    if (method === 'GET') {
      return await testSession.get(url);
    }
    if (method === 'POST') {
      return await testSession.post(url).send(data);
    }
    if (method === 'PUT') {
      return await testSession.put(url).send(data);
    }
    if (method === 'DELETE') {
      return await testSession.delete(url).send(data);
    }
  }