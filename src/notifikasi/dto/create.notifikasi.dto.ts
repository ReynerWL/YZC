    import { IsNotEmpty,} from "class-validator";

    export class CreateNotifikasiDto{
        @IsNotEmpty()
        penerima: string

        @IsNotEmpty()
        pengirim: string
        
        @IsNotEmpty()
        notificationContent: string;
    }