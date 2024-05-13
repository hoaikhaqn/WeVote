import env from "@config/env";

export default {
    checkdb: `${env.domain}/api/checkdb`,
    createPoll: `${env.domain}/api/create_poll`,
    getLastPolls: (id:string) => `${env.domain}/api/get_last_polls/${id}`,
    getInfoPoll: (id:string) => `${env.domain}/api/poll/${id}/get_info`,
    sendResponse: (id:string) => `${env.domain}/api/poll/${id}/send_response`,
}