import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler"
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel"
import { getRequestBody } from "../../../app/server_app/utils/Utils"

const getRequestBodyMock= jest.fn()

jest.mock('../../../app/server_app/utils/Utils',()=>({
    getRequestBody : ()=> getRequestBodyMock()
}))


describe('LoginHandler Test Suite',()=>{
    let sut : LoginHandler
    const request = {
        method : ''
    }
    const responseMock = {
        statusCode : 0,
        writeHead : jest.fn(),
        write : jest.fn()
    }

    const authorizerMock ={
        login : jest.fn()
    }
    const someAccount = {
        id: '',
        userName: 'someName',
        password: 'somePass'
    }
    const someToken = '1234'

    
    beforeEach(()=>{
        sut = new LoginHandler(
            request as any,
            responseMock as any ,
            authorizerMock as any
        )
    })

    afterEach(()=>{
        jest.clearAllMocks()

    })

    it('should return token for valid accounts in requests',async ()=>{
        //arrange
        request.method = HTTP_METHODS.POST
        getRequestBodyMock.mockResolvedValueOnce(someAccount)
        authorizerMock.login.mockResolvedValueOnce(someToken)
        //action 
        await sut.handleRequest()
        //assert 
        expect(authorizerMock.login).toHaveBeenCalledWith(
            someAccount.userName,
            someAccount.password
        )
        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
        expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, { 'Content-Type': 'application/json' })
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify({
            token:someToken}))
        

    })

    it('should return not found for invalid accounts in requests',async ()=>{
        //arrange
        request.method = HTTP_METHODS.POST
        getRequestBodyMock.mockResolvedValueOnce(someAccount)
        authorizerMock.login.mockResolvedValueOnce(undefined)
        //action 
        await sut.handleRequest()
        //assert 
        expect(authorizerMock.login).toHaveBeenCalledWith(
            someAccount.userName,
            someAccount.password
        )
        expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND)
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('wrong username or password'))


    })
    it('should return bad request for invalid requests',async ()=>{
        //arrange
        request.method = HTTP_METHODS.POST
        getRequestBodyMock.mockResolvedValueOnce({})
        //action
        await sut.handleRequest() 
        //assert
        expect(authorizerMock.login).not.toHaveBeenCalledWith();
        expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
        expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST, { 'Content-Type': 'application/json' })
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('userName and password required'))

    })
    it('should do nothing for not supported http methods',async ()=>{
        request.method = HTTP_METHODS.GET
        getRequestBodyMock.mockResolvedValueOnce({})

        await sut.handleRequest()

        expect(responseMock.writeHead).not.toHaveBeenCalled();
        expect(responseMock.write).not.toHaveBeenCalled();
        expect(getRequestBodyMock).not.toHaveBeenCalled();

    })
})