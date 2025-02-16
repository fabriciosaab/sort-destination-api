import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];
  private idCounter = 1;

  create(createTicketDto: CreateTicketDto): Ticket {
    const newTicket: Ticket = {
      id: this.idCounter++,
      ...createTicketDto
    };
    this.tickets.push(newTicket);
    return newTicket;
  }

}
