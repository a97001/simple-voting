# Simple Voting

## Scenario
Set up an online voting system for users to express their opinions for news topics

### Functional Requirements:
1. API interface for voting.
2. API for displaying the result.
3. API for displaying the current count for each candidate.
4. Each voting campaign with a start and end time, the campaign will not accept new vote after the end time.
5. Able to host more than one voting campaign.
6. A valid `HKID` no. is required for the voting. An HKID no. allow voting `ONLY ONCE` candidate for each campaign.
7. A list to display all voting campaign
i. Display campaigns within start/end time first and order bytotal no. of votes.
ii. Display most recent ended campaign afterward

### Non-Functional Requirements:
1. Code style and deliverable should be production ready, easy to read and maintainable
2. A clear setup document.
3. Source code hosts in public GitHub repository.
4. Unit test cases to cover critical paths.
5. API documentation with swagger.
6. High traffic and scalable architecture for both read and write architecture and display the current vote count as real-time as possible
7. Comply with HK privacy regulation


## Implementation

### Assumption & limitation
1. User will not use someone else HKID to impersonate others.
2. The system only provides nearly real-time result of the campaign during voting period since the architecture uses eventual consistency model.

### System Design & Infrastructure
1. Mongodb
    * votes collection
        ```ts
        {
            _id: ObjectId;
            campaignId: ObjectId;
            candidateId: ObjectId;
            createdAt: Date;
            hkid: string;
        }
        ```
        `* Additional uniqe index: { campaignId: 1, hkid: 1 }`

    * campaigns collection
        ```ts
        {
            _id: ObjectId;
            title: string;
            startAt: Date;
            endAt: Date;
            createdAt: Date;
            updatedAt: Date;
            candidates: [{
                _id: ObjectId;
                name: string;
                voteCnt: number;
            }];
            totalVoteCnt: number;
        }
        ```
        `* Addition index: { endAt: -1 , totalVoteCnt: -1 }`

2. Infrastructure

    ![infra-chart](https://raw.githubusercontent.com/a97001/simple-voting/main/docs/simple-voting-arch.png)

### Tech stack
1. Backend Services: Nodejs + NestJS
2. Front End: Gatsby + React
3. Database and Queue: MongoDB + Kafka
4. Docker + Docker Compose 

## Setup Menu
### Prerequisites
1. docker
2. docker-compose
3. git
4. ports
    * `8000` for web UI
    * `5000` for API gateway

### Installation guide
```bash

# Clone the project
git clone https://github.com/a97001/simple-voting.git

cd simple-voting

# Start all services
docker-compose -f docker-compose.yml -f docker-compose.prod.yaml up -d
```

Open [http://localhost:8000](http://localhost:8000) with browser after installation completed.

```bash
# Shutdown all services
docker-compose -f docker-compose.yml -f docker-compose.prod.yaml down
```

### API Documentation
Visit [http://localhost:5000/api/](http://localhost:5000/api/) to access `Swagger API` document for open API format.

### Future Works
1. Complete the unit test since time is limited.
