import { Test, TestingModule } from '@nestjs/testing';
import { PsikologService } from './psikolog.service';

describe('PsikologService', () => {
  let service: PsikologService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsikologService],
    }).compile();

    service = module.get<PsikologService>(PsikologService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
