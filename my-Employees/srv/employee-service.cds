using my.Employees as my from '../db/schema';

service EmployeeService {
    entity Employees as projection on my.Employee;
}