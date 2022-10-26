import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_TASK_DETAIL,
  REMOVE_USER_ASSIGN,
} from "../constants/Cyberbugs/TaskConstants";

const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 2,
      priority: "Medium",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 827,
        avatar: "https://ui-avatars.com/api/?name=đâu_phải _Baby Shark",
        name: "đâu_phải _Baby Shark",
        alias: "tien-do",
      },
      {
        id: 935,
        avatar: "https://ui-avatars.com/api/?name=fetht2131",
        name: "fetht2131",
        alias: "hanavi",
      },
      {
        id: 984,
        avatar: "https://ui-avatars.com/api/?name=Change Name123123",
        name: "Change Name123123",
        alias: "dat",
      },
    ],
    lstComment: [],
    taskId: 4571,
    taskName: "loris",
    alias: "loris",
    description: "<p>l&ecirc;nh</p>",
    statusId: "3",
    originalEstimate: 50,
    timeTrackingSpent: 20,
    timeTrackingRemaining: 20,
    typeId: 2,
    priorityId: 2,
    projectId: 5112,
  },
  // taskDetailModal:   {
  //   "priorityTask": {
  //     "priorityId": 2,
  //     "priority": "Medium"
  //   },
  //   "taskTypeDetail": {
  //     "id": 2,
  //     "taskType": "new task"
  //   },
  //   "assigness": [
  //     {
  //       "id": 1024,
  //       "avatar": "https://ui-avatars.com/api/?name=zoro112212",
  //       "name": "zoro112212",
  //       "alias": "le-ngoai-ngu"
  //     },
  //     {
  //       "id": 984,
  //       "avatar": "https://ui-avatars.com/api/?name=Change Name123123",
  //       "name": "Change Name123123",
  //       "alias": "dat"
  //     }
  //   ],
  //   "lstComment": [],
  //   "taskId": 4568,
  //   "taskName": "Gao",
  //   "alias": "gao",
  //   "description": "<p>okla</p>",
  //   "statusId": "3",
  //   "originalEstimate": 30,
  //   "timeTrackingSpent": 15,
  //   "timeTrackingRemaining": 15,
  //   "typeId": 2,
  //   "priorityId": 2,
  //   "projectId": 5102
  // },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      console.log(action.taskDetailModal);
      return { ...state, taskDetailModal: action.taskDetailModal };
    }
    case CHANGE_TASK_MODAL: {
      const { name, value } = action;

      return {
        ...state,
        taskDetailModal: { ...state.taskDetailModal, [name]: value },
      };
    }

    case CHANGE_ASSIGNESS: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness,
        action.userSelected,
      ];

      return { ...state };
    }

    case REMOVE_USER_ASSIGN: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness.filter(
          (us) => us.id !== action.userId
        ),
      ];
      return { ...state };
    }

    default:
      return state;
  }
};
