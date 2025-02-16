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
    console.log('findAll', this.tickets);

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

  remove(id: number): void {
    const index = this.tickets.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    this.tickets.splice(index, 1);
  }

  sortTickets(): Ticket[] {
    if (this.tickets.length === 0) {
        throw new NotFoundException(`No Tickets to sort`);
    }
  
    // Fill the maps
    const fromToMap = new Map<string, string>();
    const toFromMap = new Map<string, string>();
    const ticketMap = new Map<string, Ticket>();
  
    for (const ticket of this.tickets) {
      fromToMap.set(ticket.from, ticket.to);
      toFromMap.set(ticket.to, ticket.from);
      ticketMap.set(ticket.from, ticket);
    }
  
    // Find the first ticket(that one that no other has as destination)
    let startPoint = this.tickets.find(ticket => !toFromMap.has(ticket.from));
    if (!startPoint) {
      throw new Error('Could not determine the start ticket. Possible circular reference.');
    }
  
    // Sort the tickets
    let sortedTickets: Ticket[] = [];
    let current: Ticket | undefined = startPoint;
  
    while (current) {
      sortedTickets.push(current);
      current.order = sortedTickets.length; // Put correct order
      current = ticketMap.get(current.to); // Take the next ticket
  
      // undefined break the loop
      if (!current) break;
    }
  
    return sortedTickets;
  }

  getSortedTicketsDescription(): string {
    const sortedTickets = this.sortTickets();
  
    if (sortedTickets.length === 0) {
      return '<p>No tickets available.</p>';
    }
  
    let tripHtml = `<h2>Travel Itinerary</h2><ol>`;
  
    for (const ticket of sortedTickets) {
      tripHtml += `<li>Board <strong>${ticket.identification}</strong>`;
      
      if (ticket.access) {
        tripHtml += `, <strong>${ticket.access}</strong>`;
      }

      tripHtml += ` from <strong>${ticket.from}</strong> to <strong>${ticket.to}</strong>.`;

      if (ticket.seat) {
        tripHtml += ` <strong>${ticket.seat}</strong>.`;
      }

      if (ticket.luggage) {
        tripHtml += ` <strong>${ticket.luggage}</strong>.</li>`;
      }

      tripHtml += `</li>`;

    }
  
    tripHtml += `</ol>`;
  
    return tripHtml;
  }

  startNewTrip(): string {
    this.tickets = [];
    return 'New trip started';
  }

}
