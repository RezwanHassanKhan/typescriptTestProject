import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess"
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler"
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel"
import { Reservation } from "../../../app/server_app/model/ReservationModel";
import { getRequestBody } from "../../../app/server_app/utils/Utils";

const getRequestBodyMock = jest.fn()

jest.mock('../../../app/server_app/utils/Utils',()=>({
    getRequestBody : ()=> getRequestBodyMock()
}))

describe("ReservationHandler Test Suites",()=>{
    let sut : ReservationsHandler
     
    const request = {
        method : '',
        url : '',
        headers : {
            authorization : ''
        }
    }
    const responseMock = {
        statusCode : 0,
        write : jest.fn(),
        writeHead : jest.fn()
        
    }
    const authorizerMock = {
        validateToken : jest.fn()
    }

    const reservationsDataAccessMock ={
        createReservation : jest.fn(),
        getAllReservations : jest.fn(),
        getReservation: jest.fn(),
        updateReservation : jest.fn(),
        deleteReservation : jest.fn()
    }

    const someReservationId = 'abcd'

    const someReservation: Reservation = {
        id: '',
        endDate: new Date().toDateString(),
        startDate: new Date().toDateString(),
        room: 'someRoom',
        user: 'someUser'
    }

    beforeEach(()=>{
        sut = new ReservationsHandler(
            request as any,
            responseMock as any , 
            authorizerMock as any,
            reservationsDataAccessMock as any

        )
        request.headers.authorization = 'abcd'
        authorizerMock.validateToken.mockResolvedValueOnce(true)
    })

    afterEach(()=>{
        jest.clearAllMocks(),
        responseMock.statusCode = 0,
        request.url = ''
    })
    
    describe('Post Request Test Suite ',()=>{
        
        beforeEach(()=>{
            request.method= HTTP_METHODS.POST
        })
        
        it('should create reservation for Valid Reservation',async ()=>{

            getRequestBodyMock.mockResolvedValueOnce(someReservation)
            reservationsDataAccessMock.createReservation.mockResolvedValueOnce(someReservationId)
            
            await sut.handleRequest()
            
            //expect(reservationsDataAccessMock.createReservation).toBe(someReservationId)
            expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(
                {reservationId: someReservationId }))
            expect(responseMock.writeHead).toHaveBeenCalledWith(
                HTTP_CODES.CREATED, { 'Content-Type': 'application/json' })


        })


        it('should not create reservation for invalid request',async ()=>{
            getRequestBodyMock.mockResolvedValueOnce({})

            await sut.handleRequest()
            
            expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
            expect(responseMock.write).toHaveBeenCalledWith(
                JSON.stringify('Incomplete reservation!'))



        })


        it('should not create reservation from invalid fields in request', async () => {
            const moreThanAReservation = { ...someReservation, someField: '123' }
            getRequestBodyMock.mockResolvedValueOnce(moreThanAReservation);

            await sut.handleRequest();

            expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
            expect(responseMock.write).toHaveBeenCalledWith(
                JSON.stringify('Incomplete reservation!'))
        })

    })

    describe('Get Request Test Suite ',()=>{
        beforeEach(()=>{
            request.method = HTTP_METHODS.GET
        })

        it('id is all',async ()=>{
            request.url = '/reservations/all'
            reservationsDataAccessMock.getAllReservations.mockResolvedValueOnce(
                [someReservation])
            
            await sut.handleRequest()

            expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.OK, { 
                'Content-Type': 'application/json' })
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(
                [someReservation]))

        })

        it(' id !=all  and has reservation',async()=>{
            request.url = '/reservations/${someReservationId}'
            reservationsDataAccessMock.getReservation.mockResolvedValueOnce(someReservation)

            await sut.handleRequest()

            expect(responseMock.writeHead).toHaveBeenCalledWith(
                HTTP_CODES.OK, { 'Content-Type': 'application/json' })
            expect(responseMock.write).toHaveBeenCalledWith(
                JSON.stringify(someReservation))


            
        })
        it('id!=all but has no reservation',async ()=>{
            request.url = '/reservations/${someReservationId}'
            reservationsDataAccessMock.getReservation(undefined)

            await sut.handleRequest()

            expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND)
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(
                'Reservation with id ${someReservationId} not found'))

        })

        it('there is no id',async ()=>{
            request.url = '/reservations/'

            await sut.handleRequest()

            expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(
                'Please provide an ID!'))
         

        })

    })


    // describe('put Request Test Suite ',()=>{
        
    // })
    describe('DELETE requests', () => {
        beforeEach(() => {
            request.method = HTTP_METHODS.DELETE;
        });

        it('should delete reservation with provided id', async () => {
            request.url = '/reservations/${someReservationId}'
            
            await sut.handleRequest();

            //expect(reservationsDataAccessMock.deleteReservation).toHaveBeenCalledWith(someReservationId);
            expect(responseMock.statusCode).toBe(HTTP_CODES.OK);
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('Deleted reservation with id ${someReservationId}'));
        })

        it('should return bad request if no id provided', async () => {
            request.url = '/reservations'

            await sut.handleRequest();

            expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(
                'Please provide an ID!'
            ));
        });
    });



    it('should return nothing for not authorized requests',async ()=>{
        request.headers.authorization = '1234';
        authorizerMock.validateToken.mockReset();
        authorizerMock.validateToken.mockResolvedValueOnce(false);
        
        await sut.handleRequest()

        expect(responseMock.statusCode).toBe(HTTP_CODES.UNAUTHORIZED)
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('Unauthorized operation!'))
    })

    it('should return nothing if no authorization header is present', async () => {
        request.headers.authorization = '';
        
        await sut.handleRequest();

        expect(responseMock.statusCode).toBe(HTTP_CODES.UNAUTHORIZED)
        expect(responseMock.write).toBeCalledWith(JSON.stringify(
            'Unauthorized operation!'
        ));
    });


    it('should do nothing for not supported http methods', async () => {
        request.method = 'SOME-METHOD'
        
        await sut.handleRequest();

        expect(responseMock.write).not.toHaveBeenCalled();
        expect(responseMock.writeHead).not.toHaveBeenCalled();
    });
    
    
   

        

        
  


})