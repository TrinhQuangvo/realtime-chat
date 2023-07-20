import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  generateFakePostData() {
    const title = `${faker.lorem.sentences(6)}`
    const body = `${faker.lorem.lines({ min: 1, max: 10 })}`
    const slug = `${faker.lorem.slug(6)}`
    const data = {
      title, body, slug 
    };
    return data
  }
}

