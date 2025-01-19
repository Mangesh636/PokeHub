<br/>

<div align="center">

<img height="200" src="public/logo.png" alt="PokeHub">

# PokéHub

<br/>

<p>
PokéHub is a community-driven platform that allows Pokémon enthusiasts to share, discover, and discuss their favorite Pokémon. Whether you&apos;re a seasoned trainer or just starting your journey, PokéHub provides a space for everyone to connect and explore the Pokémon universe.
</p>

<br />

<a href="https://pok-e-hub.vercel.app/" target="_blank">Visit Now</a>

</div>

<br />

# Features

- **Browse Pokémon**: View a paginated list of Pokémon (100 per page).

- **Search Pokémon**: Instantly search through all available Pokémon by name.

- **Responsive Design**: A clean and responsive user interface for all devices.

- **Optimized Performance**: Combines search and pagination using cached data to minimize API calls.

- **Sorting Pokémon**: Sort Pokémon by Number(ID) or Name(alphabetically).

- **Advanced Filtering**: Filter Pokémon using multiple criteria(Types, Ability, Habitats, Moves, Generations, Gender, Height & Weight).

<br />

# Tech Stack

- **Frontend**

  - **Next.JS**: React framework for server-side rendering and routing.

  - **React Query**: For data fetching, caching, and synchronization.

  - **Shadcn UI**: Pre-built, customizable components for a modern UI.

  - **Tailwind CSS**: For styling and responsive design.

  - **TypeScript**: Type-safe development.

- **Backend**

  - **Hono**: High-performance, lightweight framework for building APIs.

  - **Axios**: For making HTTP requests.

  - **PokéAPI**: RESTful API providing Pokémon data.

<br />

# How it Works

1. **Data Fetching**: Pokémon data is fetched from PokéAPI via a Hono backend server.
   The backend consolidates data for pagination, filtering, and sorting.

2. **Pagination**: Displays 100 Pokémon per page using client-side pagination.

3. **Search**: Users can search for Pokémon names. Results are filtered from the cached dataset for instant feedback.

4. **Sorting**: Users can sort Pokémon by ID or Name.

5. **Filtering**: Advanced filtering allows selection based on various criteria like types, abilities, and habitats.

6. **Caching**: React Query caches Pokémon data for efficient re-fetching and performance.

<br />

# License

This project is licensed under the MIT License.

<br />

<div align="center">

# Acknowledgments

<a href="https://pokeapi.co/" target="_blank">
<img height="200" src="public/pokeapi.svg" alt="PokeHub">
</a>

## for Providing Pokémon data.

</div>
