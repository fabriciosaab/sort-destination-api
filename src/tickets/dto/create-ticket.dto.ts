import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ example: 'New York', description: 'Origin of the trip' })
  from: string;

  @ApiProperty({ example: 'Los Angeles', description: 'Destination of the trip' })
  to: string;

  @ApiProperty({ example: 'train RJX 765', description: 'Identification of the Train or Flight' })
  identification: string;

  @ApiProperty({ example: 'Platform 3', description: 'Access identification like Train Plataform or Airport Gate' })
  access: string;

  @ApiProperty({ example: '12A', description: 'Seat number' })
  seat: string;

  @ApiProperty({ example: 'Self-check-in luggage at counter', description: 'Luggage information' })
  luggage: string;

  @ApiPropertyOptional({ example: '1', description: 'Ticket Order number to be sorted', required: false  })
  @IsOptional()
  order?: number;
}
