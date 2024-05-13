export default {
    home: "/",
    createPoll: `/create-poll`,
    livePoll: (pollId:string)=>`/poll/${pollId}/live`,
    playground: (roomId:string)=>`/room/${roomId}/playground`,
    result: (roomId:string)=>`/room/${roomId}/result`,
}