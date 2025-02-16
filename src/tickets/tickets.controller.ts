import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new travel ticket' })
  @ApiResponse({ status: 201, description: 'Ticket created successfully', type: Ticket })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({ status: 200, description: 'List of travel tickets', type: [Ticket] })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get('sortTickets')
  @ApiOperation({ summary: 'Sort Tickets to correct order' })
  @ApiResponse({ status: 200, description: 'Sort completed', type: [Ticket] })
  sortTickets() {
    return this.ticketsService.sortTickets();
  }

  @Get('sort-description')
  @ApiOperation({ summary: 'Show tickets in Human readable text' })
  @ApiResponse({ status: 200, description: 'Show sorted Tickets' })
  getSortedTicketsDescription(): string {
    return this.ticketsService.getSortedTicketsDescription();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiResponse({ status: 200, description: 'Travel ticket found', type: Ticket })
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a travel ticket' })
  @ApiResponse({ status: 200, description: 'Ticket updated', type: Ticket })
  update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(Number(id), updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a travel ticket' })
  @ApiResponse({ status: 204, description: 'Ticket deleted' })
  remove(@Param('id') id: number) {
    this.ticketsService.remove(Number(id));
  }
}
