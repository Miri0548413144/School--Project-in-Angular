export enum LearningMode {
    Frontal = 'Frontal',
    Zoom = 'Zoom'
}

export class Course {
    id: number;
    name: string;
    categoryCode: number;
    lessonCount: number;
    startDate: Date;
    syllabus: string[];
    learningMode: LearningMode;
    lecturerCode: number;
    image: string;

    constructor(
        id: number,
        name: string,
        categoryCode: number,
        lessonCount: number,
        startDate: Date,
        syllabus: string[],
        learningMode: LearningMode,
        lecturerCode: number,
        image: string
    ) {
        this.id = id;
        this.name = name;
        this.categoryCode = categoryCode;
        this.lessonCount = lessonCount;
        this.startDate = startDate;
        this.syllabus = syllabus;
        this.learningMode = learningMode;
        this.lecturerCode = lecturerCode;
        this.image = image;
    }
}
