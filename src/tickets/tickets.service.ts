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

  findAll(): Ticket[] {
    return this.tickets;
  }

  findOne(id: number): Ticket {
    const ticket = this.tickets.find((t) => t.id === id);
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  update(id: number, updateTicketDto: UpdateTicketDto): Ticket {
    const ticket = this.findOne(id);
    Object.assign(ticket, updateTicketDto);
    return ticket;
  }
}
