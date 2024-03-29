type Lecturer = {
  name: string
  surname: string
  position: string
  company: string
  experiance: string[]
  courses: string[]
  contacts: (string | number)[]
}

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
  _areas: Area[] = [];
  _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(areaToAdd: Area): void {
    this._areas.push(areaToAdd)
  }

  removeArea(areaToRemove: Area): void {
    this._areas = this._areas.filter((area: Area): boolean => area !== areaToRemove)
  }

  addLecturer(lecturerToAdd: Lecturer): void {
    this._lecturers.push(lecturerToAdd)
  }

  removeLecturer(lecturerToRemove: Lecturer): void {
    this._lecturers = this._lecturers.filter((lecturer: Lecturer): boolean => lecturer !== lecturerToRemove)
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): Level[] {
    return this._levels
  }

  get name(): string {
    return this._name
  }

  addLevel(levelToAdd: Level): void {
    this._levels.push(levelToAdd)
  }

  removeLevel(levelToRemove: Level): void {
    this._levels = this._levels.filter((level: Level): boolean => level !== levelToRemove)
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get groups(): Group[] {
    return this._groups
  }

  addGroup(groupToAdd: Group): void {
    this._groups.push(groupToAdd)
  }

  removeGroup(groupToRemove: Group): void {
    this._groups = this._groups.filter((group: Group): boolean => group !== groupToRemove)
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: Area | undefined;
  _status: string | undefined;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  directionName: string;
  levelName: typeof Level.name;

  constructor(directionName: string, levelName: typeof Level.name) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  get area(): Area | "There is no area selected"  {
    if (this._area) {
      return this._area
    } else {
      return "There is no area selected"
    }
  }

  get status(): string | "There is no status selected" {
    if (this._status) {
      return this._status
    } else {
      return "There is no status selected"
    }
  }

  get students(): Student[] | "There are no students yet" {
    if(this._students) {
    return this._students
    } else {
      return "There are no students yet"
    }
  }

  get direction(): string {
    return this.directionName
  }

  get level(): string {
  return this.levelName
  }

  set status(statusToSet: string) {
    this._status = statusToSet
  }

  showPerformance(): Student[] {
    const sortedStudents: Student[] = this._students.toSorted((a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;

  }


  addStudent(studentToAdd: Student): void {
    this._students.push(studentToAdd)
  }

  removeStudent(studentToRemove: Student): void {
    this._students = this._students.filter((student: Student): boolean => student !== studentToRemove)
  }
}

type Grade = {
  workName: string
  mark: number
}
type Visit = {
  lesson: number
  present: boolean
}
class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: Grade[] = []; // workName: mark
  _visits: Visit[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = [];

    this._grades.forEach((grade: Grade) => {
      gradeValues.push(grade.mark)
    })

    if (!gradeValues.length) return 0;

    const averageGrade: number = gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number = (this._visits.filter((visit: Visit) => visit.present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
