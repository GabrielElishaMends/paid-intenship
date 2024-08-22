// src/data/teamMembers.ts

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Gabriel',
    position: 'Frontend Developer',
    image: './image/teamMember1.jpg',
  },
  {
    name: 'Elisa',
    position: 'Backend Developer',
    image: './image/teamMember3.jpg',
  },
  {
    name: 'Mends',
    position: 'Website Designer',
    image: './image/teamMember4.jpg',
  },
];

export { teamMembers };
