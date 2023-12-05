    import { IsEnum, IsNotEmpty,} from "class-validator";
    import { StatusNotifikasi } from "../entities/notifikasi.entity";

    export class CreateNotifikasiDto{
        @IsNotEmpty()
        customer: string

        @IsNotEmpty()
        psikolog: string
        
        @IsNotEmpty()
        @IsEnum(StatusNotifikasi)
        statusNotifikasi: StatusNotifikasi

        @IsNotEmpty()
        notificationContent: string;
    }