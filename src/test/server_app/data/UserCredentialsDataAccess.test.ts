import { DataBase } from "../../../app/server_app/data/DataBase"
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess"
import { Account } from "../../../app/server_app/model/AuthModel"
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

const insertMock = jest.fn()
const getByMock = jest.fn()

jest.mock('../../../app/server_app/data/DataBase',()=>{

    return{
        DataBase : jest.fn().mockImplementation(()=> {
            return {
                insert : insertMock,
                getBy : getByMock
            }
            
        })
    }

})

describe('User Credential Data Access Test Suit', ()=>
    {
        let sut : UserCredentialsDataAccess
        const someAccount : Account = {
            id: '',
            userName: 'somePassword',
            password: 'someName'

        }
        const someId = '1234'


        
        beforeEach(()=>
            {
                sut = new UserCredentialsDataAccess(); 
                expect(DataBase).toHaveBeenCalledTimes(1)
                jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValueOnce(someId);

                //const database : DataBase
            })
        afterEach(()=>
            {
                jest.clearAllMocks()
            })


        
     
        it('should add user', async ()=>{
            //arrange 
            insertMock.mockResolvedValueOnce(someId)
            
            //action
            const actualAccountId = await sut.addUser(someAccount)

            //assert
            expect(actualAccountId).toBe(someId)
            expect(insertMock).toHaveBeenCalledWith(someAccount)
            console.log(insertMock)


        })
        it('should get user by Id', async ()=>{
            //arrange
            getByMock.mockResolvedValueOnce(someAccount)
           
            //action
            const actualUser = await sut.getUserById(someId)

            //assert
            expect(actualUser).toEqual(someAccount)
            expect(getByMock).toHaveBeenCalledWith('id', someId)
        })
        it('should get user by name', async ()=>{
            //arrange 
            getByMock.mockResolvedValueOnce(someAccount)


            //action 
            const actualUser = await sut.getUserByUserName(someAccount.userName)
            //assert
            expect(actualUser).toBe(someAccount)
            expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName)

        })
    })