import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderYzcDto } from "./create-order.dto";

export default class UpdateOrderYzcDto extends PartialType(CreateOrderYzcDto){}