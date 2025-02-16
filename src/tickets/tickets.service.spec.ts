import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { NotFoundException } from '@nestjs/common';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should create a ticket', () => {
    const ticket = service.create({
      from: 'New York',
      to: 'Los Angeles',
      identification: '123456789',
      access: 'VIP',
      seat: '12A',
      luggage: '2 bags'
    });

    expect(ticket).toHaveProperty('id');
    expect(ticket.from).toBe('New York');
  });

  
});