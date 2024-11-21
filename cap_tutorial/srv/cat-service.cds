using { cap_tutorial as db } from '../db/data-model';

service CatalogService@(path:'/CatalogService')
    {

    entity Employee as projection on db.Employee
    }
