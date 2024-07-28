import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess"
import { Reservation } from "../../../app/server_app/model/ReservationModel"
import { DataBase } from "../../../app/server_app/data/DataBase"

const insertMock = jest.fn()
const updateMock = jest.fn()
const deleteMock = jest.fn()
const getbyMock = jest.fn()
const getAllElementsMock = jest.fn()

jest.mock('"../../../app/server_app/data/DataBase', ()=>{
    return{
        DataBase : jest.fn().mockImplementation(()=>{
            return{
                insert : insertMock,
                update : updateMock,
                delete : deleteMock,
                getBy : getbyMock,
                getAllElements : getAllElementsMock
            }
        })
    }
})


describe('Reservation Data Access',()=>{
   //INITIAL ARRANGEMENT FOR ALL THE TEST CASES 
    let sut : ReservationsDataAccess
    

    beforeEach(()=>{
        sut = new ReservationsDataAccess()
    })
    afterEach(()=>{
        jest.clearAllMocks();
        //someReservation.id = '';
    })
    const someReservation : Reservation = {
        endDate: 'someEndDate',
        startDate: 'someStartDate',
        id: '',
        room: 'someRoom',
        user: 'someUser'
    }
    const fakeId =  '1234'

    
    
    
    it('should create reservation', async ()=>{
        //Arrange
        insertMock.mockResolvedValueOnce(fakeId)
        //Action 
        const actualId = await sut.createReservation(someReservation)
        //Assert 
        expect(actualId).toBe(fakeId)
        expect(insertMock).toHaveBeenCalledWith(someReservation)
    })
    it('should update reservation', async ()=>{
        //arrange 
        
        //action 
        await sut.updateReservation(fakeId ,'endDate','someEndDate')
        //assert
        expect(updateMock).toHaveBeenCalledWith(fakeId,'endDate','someEndDate')
    })
    it('should delete reservation',async ()=>{
        await sut.deleteReservation(fakeId)
        expect(deleteMock).toHaveBeenCalledWith(fakeId)
        

    })
    it('should get reservation',async ()=>{
        //arrange 
        getbyMock.mockResolvedValueOnce(someReservation)
        //action
        const actual_reservation = await sut.getReservation(fakeId)
        console.log(actual_reservation)
        //assert
        expect(actual_reservation).toEqual(someReservation)
        expect(getbyMock).toHaveBeenCalledWith('id', fakeId)

    })
    it('should get all reservation',async ()=>{
        getAllElementsMock.mockResolvedValueOnce([someReservation,someReservation])

        const actual_elements = await sut.getAllReservations()
        expect(actual_elements).toEqual([someReservation,someReservation])
        expect(getAllElementsMock).toHaveBeenCalledTimes(1)


    })
})