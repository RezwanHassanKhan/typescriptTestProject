
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler"
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel"
import { getRequestBody } from "../../../app/server_app/utils/Utils"

const getRequestBodyMock = jest.fn()

jest.mock('../../../app/server_app/utils/Utils', ()=>({
    getRequestBody: () => getRequestBodyMock()
}))


describe('RequestHandler Test Suites',()=>{
    let sut : RegisterHandler
    const request ={
        method : ''
    }
    const responseMock ={
        statusCode : 0 ,
        writeHead : jest.fn(),
        write : jest.fn()

    }
    const authorizerMock ={
        registerUser : jest.fn()

    }
    const someAccount = {
        id: '',
        userName: 'someName',
        password: 'somePassword'

    }
    const someId = '1234'

    beforeEach(()=>{
        sut = new RegisterHandler(
            request as any ,
            responseMock as any ,
            authorizerMock as any
        )
    })
    afterEach(()=>{
        jest.clearAllMocks()
    })
    
    it('should register valid accounts in requests',async ()=>{

        //arrange
        request.method = HTTP_METHODS.POST
        getRequestBodyMock.mockResolvedValueOnce(someAccount)
        authorizerMock.registerUser.mockResolvedValueOnce(someId)
        //action 
        await sut.handleRequest()
        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
        expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, { 'Content-Type': 'application/json' })
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify({'userId':someId}))

    })
    it('should not register invalid accounts in requests',async ()=>{
        //arrange
        request.method = HTTP_METHODS.POST
        getRequestBodyMock.mockResolvedValueOnce({})
        //action 
        await sut.handleRequest()

        //assert
        expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
        expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST, { 'Content-Type': 'application/json' })
        expect(responseMock.write).toHaveBeenCalledWith( JSON.stringify(
            'userName and password required'
        ))
    })
    it('should do nothing for not supported http methods',async()=>{
        request.method = HTTP_METHODS.GET
        //action
        await sut.handleRequest()
        //assert
        expect(getRequestBodyMock).not.toHaveBeenCalled()
        expect(responseMock.writeHead).not.toHaveBeenCalled()
        expect(responseMock.write).not.toHaveBeenCalled()
    })
   
})