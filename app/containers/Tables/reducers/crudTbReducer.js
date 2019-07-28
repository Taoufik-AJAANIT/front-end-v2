import { fromJS, List, Map } from "immutable";
import notif from "enl-api/ui/notifMessage";
import { CLOSE_NOTIF } from "enl-redux/constants/notifConstants";
import {
  FETCH_DATA_SUCCESS,
  BOLCK_USER_SUCCESS,
  ADD_EMPTY_ROW,
  UPDATE_ROW,
  REMOVE_ROW,
  EDIT_ROW,
  SAVE_ROW
} from "./crudTbConstants";

const initialState = {
  dataTable: List([]),
  notifMsg: ""
};

const initialItem = (keyTemplate, anchor) => {
  const [...rawKey] = keyTemplate.keys();
  const staticKey = {
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
  };
  for (let i = 0; i < rawKey.length; i += 1) {
    if (rawKey[i] !== "id" && rawKey[i] !== "edited") {
      staticKey[rawKey[i]] = anchor[i].initialValue;
    }
  }
  // Push another static key
  staticKey.edited = true;

  return Map(staticKey);
};

const initialImmutableState = fromJS(initialState);

export default function crudTbReducer(
  state = initialImmutableState,
  action = {}
) {
  const { branch } = action;
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return state.withMutations(mutableState => {
        const dataTable = fromJS(action.users);
        mutableState.set("dataTable", dataTable);
      });

    case `${branch}/${ADD_EMPTY_ROW}`:
    // return state.withMutations(mutableState => {
    //   const raw = state.get("dataTable").last();
    //   const initial = initialItem(raw, action.anchor);
    //   mutableState.update("dataTable", dataTable =>
    //     dataTable.unshift(initial)
    //   );
    // });
    case BOLCK_USER_SUCCESS:
      return state.withMutations(mutableState => {
        let user = state.get("users").find(user => {
          user.get("id") === action.payload.payload;
        });
        console.log(user.get("enabled"));
        user = user.set("enabled", !user.get("enabled"));
        console.log(state.get("users"));
        // mutableState
        //   .update("dataTable", dataTable => dataTable.splice(index, 1))
        //   .set("notifMsg", notif.removed);
      });
    case `${branch}/${UPDATE_ROW}`:
    // return state.withMutations(mutableState => {
    //   const index = state.get("dataTable").indexOf(action.item);
    //   const cellTarget = action.event.target.name;
    //   const newVal = type => {
    //     if (type === "checkbox") {
    //       return action.event.target.checked;
    //     }
    //     return action.event.target.value;
    //   };
    //   mutableState.update("dataTable", dataTable =>
    //     dataTable.setIn([index, cellTarget], newVal(action.event.target.type))
    //   );
    // });
    case `${branch}/${EDIT_ROW}`:
    // return state.withMutations(mutableState => {
    //   const index = state.get("dataTable").indexOf(action.item);
    //   mutableState.update("dataTable", dataTable =>
    //     dataTable.setIn([index, "edited"], true)
    //   );
    // });
    case `${branch}/${SAVE_ROW}`:
    // return state.withMutations(mutableState => {
    //   const index = state.get("dataTable").indexOf(action.item);
    //   mutableState
    //     .update("dataTable", dataTable =>
    //       dataTable.setIn([index, "edited"], false)
    //     )
    //     .set("notifMsg", notif.saved);
    // });
    case `${branch}/${CLOSE_NOTIF}`:
    // return state.withMutations(mutableState => {
    //   mutableState.set("notifMsg", "");
    // });
    default:
      return state;
  }
}
