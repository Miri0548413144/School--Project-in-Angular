export enum LearningMode {
    Frontal = 'Frontal',
    Zoom = 'Zoom'
}

export class Course {
    id: number;
    name: string;
    categoryId: number;
    lessonCount: number;
    startDate: Date;
    syllabus: string[];
    learningMode: LearningMode;
    lecturerId: number;
    image: string;

    constructor(
        name: string,
        categoryId: number,
        lessonCount: number,
        startDate: Date,
        syllabus: string[],
        learningMode: LearningMode,
        lecturerId: number,
        image: string
    ) {
        this.id = 0;
        this.name = name;
        this.categoryId = categoryId;
        this.lessonCount = lessonCount;
        this.startDate = startDate;
        this.syllabus = syllabus;
        this.learningMode = learningMode;
        this.lecturerId = lecturerId;
        this.image = image;
    }
}
