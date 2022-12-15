import {Message, MessageService} from "primeng/api";

export function callError(service:MessageService, summary:string,detail:string) {
  const mesage:Message = {summary,detail,severity:"error",life:3000}
  service.add(mesage);
}
export function callWarning(service:MessageService, summary:string,detail:string){
  const mesage:Message = {summary,detail,severity:"warn",life:5000}
  service.add(mesage);
}
