import { IsNotEmpty} from "class-validator";


export class UpdateNotifikasiDto{ 
    @IsNotEmpty()
    notificationContent: string;
}