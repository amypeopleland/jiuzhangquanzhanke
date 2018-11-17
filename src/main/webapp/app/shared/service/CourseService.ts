import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { SERVER_API_URL } from 'app/app.constants';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Injectable()
//注入依赖 （autowire)
export class CourseService {
    //postman 扣的地址就是这里
    private courseAddressUrl = SERVER_API_URL + '/api/course/findAllCoursesDto';
    private courseAddressWithTNUrl = SERVER_API_URL + '/api/course/findAllCoursesWithTNDto';
    private courseDeleteUrl = SERVER_API_URL + '/api/course/deleteCourse';
    private courseUpdateUrl = SERVER_API_URL + '/api/course/updateCourse';

    constructor(private http: HttpClient) {}

    //Obervable 期待被别人看到的 对任何一个component 可以替代的,一个泛型
    getCourseInfo(): Observable<CourseDto[]> {
        //返回一个CourseDto的数组
        return this.http.get<CourseDto[]>(`${this.courseAddressUrl}`);
    }

    getCourseInfoWithTN(): Observable<CourseWithTNDto[]> {
        return this.http.get<CourseWithTNDto[]>(`${this.courseAddressWithTNUrl}`);
    }
    delete(courseName: String): Observable<Response> {
        return this.http.delete<Response>(`${this.courseDeleteUrl}/${courseName}`);
    }
    update(course: CourseDto): Observable<Response> {
        return this.http.put<Response>(this.courseUpdateUrl, course);
    }
}
