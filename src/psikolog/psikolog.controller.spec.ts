import { Test, TestingModule } from '@nestjs/testing';
import { PsikologController } from './psikolog.controller';

describe('PsikologController', () => {
  let controller: PsikologController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PsikologController],
    }).compile();

    controller = module.get<PsikologController>(PsikologController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
