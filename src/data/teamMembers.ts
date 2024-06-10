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
    image: './image/imgHome1.jpg',
  },
  {
    name: 'Elisha',
    position: 'Backend Developer',
    image: './image/imgHome1.jpg',
  },
  {
    name: 'Mends',
    position: 'Website Designer',
    image: './image/imgHome1.jpg',
  },
];

export { teamMembers };
