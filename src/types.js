export var UserType;
(function (UserType) {
    UserType["customer"] = "customer";
    UserType["lawyer"] = "lawyer";
})(UserType || (UserType = {}));
export var CallStatus;
(function (CallStatus) {
    CallStatus["canceled"] = "canceled";
})(CallStatus || (CallStatus = {}));
export const testMessages = [
    {
        text: "Привет! Как дела?",
        timestamp: "2025-07-01T12:00:00Z",
        id: "msg1",
        from: "user1",
        seen: undefined
    },
    {
        text: "Всё отлично, спасибо!",
        seen: true,
        timestamp: "2025-07-01T12:05:00Z",
        id: "msg2",
        from: "user2"
    },
    {
        text: "Когда встречаемся?",
        seen: undefined,
        timestamp: "2025-07-01T12:10:00Z",
        id: "msg3",
        from: "user1"
    },
    {
        text: "Сегодня вечером, в 19:00.",
        seen: false,
        timestamp: "2025-07-01T12:15:00Z",
        id: "msg4",
        from: "user2"
    }
];
