// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const getToken = require('./getToken')
const sendNotification = require('./sendNotification')

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome, you can schedule an activity, or see which activities are happening. Which would you like to try?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        const speechText = 'Ok, I\'ll add you to the activity';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const setEventHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'setEvent'
    },
    handle(handlerInput) {
      /* return getToken.send().then((resp) => {
            let data = resp//JSON.parse(resp)
            let token = data['access_token']
            let body = `{
                          "timestamp": "2019-06-08T10:12:01.00Z",
                          "referenceId": "unique-id-of-this-event-instance-abc123456789",
                          "expiryTime": "2019-07-23T14:00:00.00Z",
                            "event": {
                            "name": "AMAZON.MessageAlert.Activated",
                            "payload": {
                              "state": {
                                "status": "UNREAD"
                              },
                              "messageGroup": {
                                "creator": {
                                  "name": "MeetMessage"
                                },
                                "count": 1
                              }
                            }
                          },
                             "localizedAttributes": [
                              {
                                "locale": "en-US",
                                "providerName": "MeetMaster",
                                "contentName": "Some event"
                              }
                            ],
                           "relevantAudience": {
                            "type": "Multicast",
                            "payload": {}
                           }
                        }`
            return sendNotification.sendNot(token, body).then((resp) => {*/
                return handlerInput.responseBuilder
                    .speak(`Ok, I'll let your Paddle Group know`)
                    .withShouldEndSession(true)
                    .getResponse();
           /* }).catch(err => {
                return handlerInput.responseBuilder
                    .speak(`Sorry, error on send ` + err)
                    .withShouldEndSession(true)
                    .getResponse();
            })
        }).catch(err => {
            return handlerInput.responseBuilder
                    .speak(`Sorry, error on token ` + err)
                    .withShouldEndSession(true)
                    .getResponse();
        })*/
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CreateEventIntentHandler = {
  canHandle(handlerInput){
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CreateEventIntent';
  },  
  handle(handlerInput){
      const group = handlerInput.requestEnvelope.request.intent.slots.group.value;
      const activity = handlerInput.requestEnvelope.request.intent.slots.activity.value;
      const day = handlerInput.requestEnvelope.request.intent.slots.day.value;
      
      if(group === null){
          const speechText = 'What group are you going with?';
          
          return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
      }
      if(activity === null){
          const speechText = 'What activity are you going to do?';
          
          return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
      }
      if(day === null){
          const speechText = 'What date are you going?';
          
          return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
      }
  }
};

const GetNotifIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetNotifIntent';
    },
    handle(handlerInput) {
        const speechText = 'Your upcoming events are: Meeting Katie at Synch Park at 3, Play basketball with the boys at  7pm, Helping Margaret with baking at 10 pm';
        const repromptText = "Would you like to hear it again?";
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};

const FriendPlansIntentHandler= {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetNotifIntent';
    },
    handle(handlerInput) {
        const speechText = 'Sure - Looks like Brianna is going kayaking at Bantam Lake on Sunday. Do you want to join?';
        const repromptText = "Do you want to join?";
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        FriendPlansIntentHandler,
        GetNotifIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        CreateEventIntentHandler,
        setEventHandler,
        YesIntentHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
