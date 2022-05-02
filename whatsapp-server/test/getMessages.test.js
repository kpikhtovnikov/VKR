import { expect } from 'chai';
import supertest from 'supertest';
import session from 'supertest-session';
import router from '../src/server'
import { sendRequest } from './test.utils';



describe('Chats Testing', () => {

    test('Chats', async () => {
        let data = {
            refId: '622fa6075d7c7d2fd62954b5',
            usersId: ''
        };
        let res = await sendRequest(
            testSession,
            `${pathPrefix}/chats/:${data.refId}`,
            'GET'
        );
        expect(res.status).to.be.eq(200);

        let chats = await fetchCurrentChats(testSession);
        expect(res.status).to.be.eq(200);

        let participants = [{
            objectId: '182cfa60f5f57c4f25dn207475'
        }, 
        {
            objectId: '885ca6tb5h7c4dc5dk207457'
        }]

        data = {
            _id: '342ca60b557c4d25dn2074d5',
            participants: participants.map((participant) => {
            return {
                objectId: new ObjectId(participant.objectId),
                lastViewed: participant.lastViewed,
            };
            }),
            modifiedOn: '1647291603572',
            type: 'chat'
        };

        let newChat = await createChat(testSession, data);
        expect(res.status).to.be.eq(200);

        data = {
            _id: null,
            participants: participants.map((participant) => {
            return {
                objectId: new ObjectId(participant.objectId),
                lastViewed: participant.lastViewed,
            };
            }),
            modifiedOn: '1647291603572',
            type: 'chat'
        };

        newChat = await createChat(testSession, data);
        expect(res.status).to.be.eq(404);
    });
})


describe('Delete Chat', () => {

    test('delete chat', async () => {
        let data = {
            _id: '25ffg07lo4c7d2tz629ty5k',
        };

        let chat = await deleteCurrentChats(testSession, data);
        expect(res.status).to.be.eq(200);

        data = {
            _id: null
        };

        chat = await deleteCurrentChats(testSession, data);
        expect(res.status).to.be.eq(404);
    });
})