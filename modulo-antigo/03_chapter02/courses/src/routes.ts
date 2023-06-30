import { Request, Response } from 'express';

import CreateCourseService from './CreateCourseService';

export function createCourse(request: Request, response: Response) {
  CreateCourseService.execute({
    name: 'NodeJs',
    educator: 'José',
    duration: 4,
  }); // executa o Create

  CreateCourseService.execute({
    name: 'ReactJs',
    educator: 'Maria',
  });

  return response.send();
}