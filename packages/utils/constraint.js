import { MESSAGE_TYPE, MESSAGE_STATUS, CONTACT_TYPE } from "utils/constant";
import { error } from "utils";
import { isPlainObject } from "utils/validate";

const constraintContactBasic = data =>
  constraintObject(data, {
    id: true,
    displayName: true,
    avatar: true,
    type: {
      required: true,
      has: CONTACT_TYPE
    }
  });
const constraintMessageBasic = data =>
  constraintObject(data, {
    content: true,
    sendTime: true,
    type: {
      required: true,
      has: MESSAGE_TYPE
    }
  });

// constraintContact({
//   id: "123",
//   displayName: "123asd",
//   avatar: "123",
//   type: "single",
//   message: {
//     unread: 0,
//     sendTime: 12312312,
//     content: "12312312",
//     type: "image"
//   }
// });

constraintContact({
  id: "123",
  displayName: "123asd",
  avatar: "123",
  type: "single",
  unread: 0,
  lastSendTime: "",
  subText: "12312312"
  // message: {
  //   unread: 0,
  //   sendTime: 12312312,
  //   content: "12312312",
  //   type: "image"
  // }
});

// constraintRecentContact({
//   fromContactId: 0,
//   unread: 0,
//   sendTime: 12312312,
//   content: "12312312"
// });

constraintMessage({
  id: "123",
  status: "succeed",
  type: "image",
  sendTime: 12312312312,
  content: "asdas",
  fromContactId: "123",
  fromUser: { id: "123", displayName: "123", avatar: "123", type: "single" }
});
export function constraintObject(data, options) {
  if (!data || !isPlainObject(data)) {
    error("argument must be an object");
  }
  Object.keys(options).forEach(k => {
    const option = options[k];
    const val = data[k];
    if ((option === true || option.required === true) && val === undefined) {
      error(`"${k}" cannot be "${val}" `);
    } else if (option.has && !option.has.includes(val)) {
      error(
        `"${k}" cannot be "${val}",can only be the following data "${
          option.has
        }"`
      );
    }
  });
  return true;
}

// export function constraintRecentContact(data) {
//   constraintContact(data);
//   constraintMessageBasic(data.message);
//   constraintObject(data, {
//     unread: true
//   });
// }
export function constraintContact(data) {
  constraintContactBasic(data);
  // constraintObject(data, {
  //   unread: true,
  //   lastSendTime: true,
  //   lastContent: true
  // });
}
export function constraintMessage(data) {
  constraintObject(data, {
    status: {
      required: true,
      has: MESSAGE_STATUS
    },
    fromContactId: true
  });
  constraintMessageBasic(data);
  constraintContactBasic(data.fromUser);
  let options = {};
  switch (data.type) {
    case "file":
      options = {
        fileSize: true,
        fileName: true
      };
      break;
    case "text":
      options = {
        text: true
      };
      break;
  }
  constraintObject(data, options);
}
