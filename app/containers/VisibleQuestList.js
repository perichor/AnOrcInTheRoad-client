import { connect } from 'react-redux';
import { addQuest } from '../actions/actions';
import quests from '../constants/quests.json';
import QuestList from '../components/QuestList';
import * as Exponent from 'exponent';

// import io from 'socket.io-client';
// let socket = io('http://10.7.24.229:3000');

import socket from '../main';

const mapStateToProps = (state) => {
  return {
    quests: state.quests,
    // quests: quests,
  };
};

async function getLocationAsync(cb) {
  const { Location, Permissions } = Exponent;
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    return Location.getCurrentPositionAsync()
      .then((result) => {
        console.log('RESULT COORD', result);
        // return dispatch(addQuest(name, location, questType, experience, creator_id, result.coords.latitude, result.coords.longitude, item_id));
        return cb(result);
      })
      .catch((error) => {
        return error;
      });
    } else {
    throw new Error('Location permission not granted');
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitQuest: (name, location, questType, experience, creator_id, item_id) => {
      getLocationAsync((result) => {
        console.log('MY RESULT', result.coords);
        return addQuest(name, location, questType, experience, creator_id, result.coords.latitude, result.coords.longitude, item_id);
      })
      .then((result) => {
        console.log('FINAL RESULT', result);
        dispatch(result);
        socket.emit('add quest', result);
        // dispatch({ type: 'server/addQuest', data: result });
      });

      // navigator.geolocation.getCurrentPosition((data, error) => {
      //   if (error) {
      //     throw error;
      //   } else {
      //     console.log(data.coords);
      //     currentLocation = data.coords;
      //     dispatch(addQuest(name, location, questType, experience, creator_id, currentLocation.latitude, currentLocation.longitude, item_id));
      //   }
      // });
      // console.log(myCoord);

      // console.log('RESULTS', myCoord, dist);

      // console.log('Visible quest list: ADDING QUEST');
    },
  };
};

const VisibleQuestList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestList);

export default VisibleQuestList;
