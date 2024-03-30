type Lecturer = {
  firstName: string
  lastName: string
  position: string
  company: string
  experiance: string[]
  courses: string[]
  contacts: (string | number)[]
}
type Fullname = `${string} ${string}`

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

  removeArea(areaToRemove: string): void {
    this._areas = this._areas.filter(({name}: Area): boolean => name !== areaToRemove)
  }

  addLecturer(lecturerToAdd: Lecturer): void {
    this._lecturers.push(lecturerToAdd)
  }

  removeLecturer(lecturerToRemoveName: string, lecturerToRemoveSurname: string): void {
    const lecturerToRemoveFullName: Fullname = `${lecturerToRemoveName} ${lecturerToRemoveSurname}` 

    this._lecturers = this._lecturers.filter(({ firstName, lastName }: Lecturer): boolean => {
      const lecturerFullname: Fullname = `${firstName} ${lastName}`

      return lecturerFullname !== lecturerToRemoveFullName
    })
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

  removeLevel(levelToRemove: string): void {
    this._levels = this._levels.filter(({name}: Level): boolean => name !== levelToRemove)
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

  removeGroup(groupToRemove: Number): void {
    this._groups = this._groups.filter(({groupNumber}: Group): boolean => groupNumber !== groupToRemove)
  }
}

enum ErrorMessages {
  area = "There is no area selected",
  status = "There is no status selected",
  students = "There are no students yet"
}
class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: Area | undefined;
  _status: string | undefined;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  // I add _groupNumber because there is any good indifacor for add/remove method of class Level
  _groupNumber: number;
  directionName: string;
  levelName: typeof Level.name;

  constructor(directionName: string, levelName: typeof Level.name, _groupNumber: number) {
    this.directionName = directionName;
    this.levelName = levelName;
    this._groupNumber = _groupNumber
  }
  get area(): Area | ErrorMessages.area  {
    if (this._area) {
      return this._area
    } else {
      return ErrorMessages.area
    }
  }

  get status(): string | ErrorMessages.status {
    if (this._status) {
      return this._status
    } else {
      return ErrorMessages.status
    }
  }

  get students(): Student[] | ErrorMessages.students {
    if(this._students) {
    return this._students
    } else {
      return ErrorMessages.students
    }
  }

  get groupNumber(): number {
    return this._groupNumber
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

  removeStudent(studentToRemoveName: string, studentToRemoveSurname: string): void {
    const studentToRemoveFullname: Fullname = `${studentToRemoveName} ${studentToRemoveSurname}`

    this._students = this._students.filter((student: Student): boolean => student.fullName !== studentToRemoveFullname)
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

  get fullName(): Fullname {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: Fullname) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set grade(grade: Grade) {
    this._grades.push(grade)
  }

  set visit(visit: Visit) {
    this._visits.push(visit)
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
