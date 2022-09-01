import React from 'react';
import { useState,
         useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import { DateTime } from 'luxon';

import ProjectListHeader from '../components/projects/ProjectListHeader';
import ProjectList from '../components/projects/ProjectList';
import { SORT_FIELDS,
         SORT_ORDERS } from '../constants';
import { getProjects } from '../services/projects.service';
import { getParticipants } from '../services/participants.service';


const titleCompareFn = (project1, project2, order) => {
    const title1 = project1.title.trim().toLocaleLowerCase();
    const title2 = project2.title.trim().toLocaleLowerCase();
    const compareResult = title1.localeCompare(title2);
    return order === 'asc' ? compareResult : -compareResult;
};
const yearCompareFn = (project1, project2, order) => {
    const compareResult = project1.year - project2.year;
    return order === 'asc' ? compareResult : -compareResult;
};
const lastUpdateTimeCompareFn = (project1, project2, order) => {
    const lastUpdateTime1 = DateTime.fromISO(project1.lastUpdateTime);
    const lastUpdateTime2 = DateTime.fromISO(project2.lastUpdateTime);
    const compareResult = lastUpdateTime1 < lastUpdateTime2 ? -1 : 1;
    return order === 'asc' ? compareResult : -compareResult;
};

export default function Projects() {
    const [allProjects, setAllProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [allParticipants, setAllParticipants] = useState([]);

    const [sortField, setSortField] = useState(SORT_FIELDS[0]);
    const [sortOrder, setSortOrder] = useState(SORT_ORDERS[0]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const jsonProjects = await getProjects();
            const projects = jsonProjects.data.sort((project1, project2) => {
                return titleCompareFn(project1, project2, 'asc');
            });
            setAllProjects(projects);
            setFilteredProjects([...projects]);
            const jsonParticipants = await getParticipants();
            setAllParticipants(jsonParticipants.data);
        };
        fetchData()
            .catch((error) => console.log(error.message));
    }, []);

    const handleSortFieldChange = (event) => {
        let compareFn;
        switch (event.target.value) {
            case 'year':
                compareFn = (project1, project2) => {
                    return yearCompareFn(project1, project2, sortOrder.value);
                };
                setAllProjects(allProjects.sort(compareFn));
                setFilteredProjects(filteredProjects.sort(compareFn));
                break;
            case 'lastUpdateTime':
                compareFn = (project1, project2) => {
                    return lastUpdateTimeCompareFn(project1, project2, sortOrder.value);
                };
                setAllProjects(allProjects.sort(compareFn));
                setFilteredProjects(filteredProjects.sort(compareFn));
                break;
            case 'title':
            default:
                compareFn = (project1, project2) => {
                    return titleCompareFn(project1, project2, sortOrder.value);
                };
                setAllProjects(allProjects.sort(compareFn));
                setFilteredProjects(filteredProjects.sort(compareFn));
        }
        setSortField({
            value: event.target.value,
            label: SORT_FIELDS.find(({ value, }) => value === event.target.value).label
        });
    }
    const handleSortOrderChange = () => {
        setAllProjects(allProjects.reverse());
        setFilteredProjects(filteredProjects.reverse());
        const newSortOrderValue = (sortOrder.value === 'asc') ? 'desc' : 'asc';
        setSortOrder({
            value: newSortOrderValue,
            label: SORT_ORDERS.find(({ value, }) => value === newSortOrderValue).label
        });
    };
    const handleFilterChange = (event) => {
        const keywords = event.target.value.trim().toLocaleLowerCase().split(' ');
        if (keywords.length > 0) {
            setFilteredProjects(allProjects.filter((project) => {
                const title = project.title.trim().toLocaleLowerCase();
                const participants = project.participants.map((participant) => {
                    return `${participant.firstName} ${participant.lastName}`;
                }).join(' ').toLocaleLowerCase();
                const year = `${project.year}`;
                return keywords
                    .map((keyword) => {
                        return title.includes(keyword) ||
                            participants.includes(keyword) ||
                            year.includes(keyword);
                    })
                    .reduce((result, curr) => result && curr, true);
            }));
        }
        setFilter(event.target.value);
    };

    return (
        <Card>
            <ProjectListHeader sortField={sortField}
                               onSortFieldChange={handleSortFieldChange}
                               sortOrder={sortOrder}
                               onSortOrderChange={handleSortOrderChange}
                               filter={filter}
                               onFilterChange={handleFilterChange}
                               allParticipants={allParticipants} />
            <ProjectList numTotalProjects={allProjects.length}
                         filteredProjects={filteredProjects}
                         allParticipants={allParticipants} />
        </Card>
    );
};
