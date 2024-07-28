import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";
import { DataBase } from "../../../app/server_app/data/DataBase";
import { Account } from "../../../app/server_app/model/AuthModel";
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

const insertMock = jest.fn()
const updateMock = jest.fn()
const getByMock = jest.fn()



jest.mock('../../../app/server_app/data/DataBase',()=>{
    return{
        DataBase : jest.fn().mockImplementation(()=>{
            return{
                insert : insertMock,
                update : updateMock,
                getBy : getByMock
            }
        })
    }
    
})

describe('SessionTokenDataAccess Test Suite', ()=>{
    let sut : SessionTokenDataAccess

    const someAccount  : Account = {
        id: '',
        userName: 'someName',
        password: 'somePassword'

    }
    const someTokenId = '1234'

    beforeEach(()=>{
        sut = new SessionTokenDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1);
        jest.spyOn(global.Date, 'now').mockReturnValue(0);
        //jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValueOnce(someTokenId);
    })

    afterEach(()=>{
        jest.clearAllMocks()
    })

    it('should generate Token', async ()=>{
        //arange 
        insertMock.mockResolvedValueOnce(someTokenId)
        //action
        const actual_id = await sut.generateToken(someAccount)
        //assert 
        expect(actual_id).toBe(someTokenId)
        expect(insertMock).toHaveBeenCalledWith({
            id: '',
            userName: someAccount.userName,
            valid: true,
            expirationDate: new Date(1000 * 60 * 60)
        })
        


    })

    it('should chk invalidate token', async ()=>{
        await sut.invalidateToken(someTokenId)
        expect(updateMock).toHaveBeenCalledWith(someTokenId, 'valid', false )
    }) 

    it('should chk valid Token', async ()=>{
        //arrane 
        getByMock.mockResolvedValueOnce({'valid' : true})

        //action 
        const actualbool = await sut.isValidToken({} as any)

        //assert 
        expect(actualbool).toBe(true)

    })

    it('should chk invalid token', async ()=>{
        //arrane 
        getByMock.mockResolvedValueOnce({'valid' : false})

        //action 
        const actualbool = await sut.isValidToken({} as any)

        //assert 
        expect(actualbool).toBe(false)

    })

    it('should check inexistent token', async () => {
        
        getByMock.mockResolvedValueOnce(undefined);

        const actual = await sut.isValidToken({} as any)

        expect(actual).toBe(false);
    });

})