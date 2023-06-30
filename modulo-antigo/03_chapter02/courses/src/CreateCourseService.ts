/* 
  name - string
  duration - number
  educator - string
*/

// interface é um casca da aplicação que pode receber
interface Course {
  name: string;
  duration?: number; // ? será opcional
  educator: string;
}

class CreateCourseService {
  execute({ name, duration = 8, educator }: Course) { // duration valor padrão igual a 8
    console.log(name, duration, educator);
  } // função de execute
}

export default new CreateCourseService(); // new não precisa instanciar