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

  it('should return all tickets', () => {
    service.create({ from: 'NY', to: 'LA', identification: '123', access: 'VIP', seat: '1A', luggage: '1 bag'});
    expect(service.findAll().length).toBe(1);
  });

  it('should throw error when ticket not found', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should delete a ticket', () => {
    const ticket = service.create({ from: 'NY', to: 'LA', identification: '123', access: 'VIP', seat: '1A', luggage: '1 bag'});
    service.remove(ticket.id);
    expect(service.findAll().length).toBe(0);
  });
});