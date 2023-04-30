import {HttpClient, HttpHeaders, HttpHandler} from '@angular/common/http'
//import fetch from 'node-fetch'
import axios from 'axios'

describe('ChatFunctions', () => {
  let http: HttpClient;
  let handler: HttpHandler;

  it('should create a conversation', async () => {
    //http = new HttpClient();
    const Mockrequest = {
      conversation : {
        PairID: '123',
        User1ID: '123',
        User2ID: '234',
        Messages: {
          ToUserID: '123',
          FromUserID: '123',
          DateSent: '123',
          Content: 'hello',
        },
        MeetingDetails: {

          Date: '2020',
          Time: '12:00:00',
          Location: 'Menlyn',
          FoodPreference: 'Sushi',
          DressCode: 'Formal',
          TimeInvested: 123
        }
      }
    }

    const headers = {'Content-type': 'application/json'};
    const body = JSON.stringify(Mockrequest)
    const resp = axios.get('http://127.0.0.1:5005/cos301miniprojectg2/us-central1/createConversation').then(response => {console.log(response)});
    //console.log(resp);

  });
});