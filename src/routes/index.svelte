<div class="flex flex-col bg-dark-8 items-center">
    <a href="/progress" class="hidden">progress</a>
    <h1 class="text-4xl sm:text-6xl mt-16 text-accent-3 font-serif font-bold">linguaksara</h1>
    <p class="font-sans mt-2 text-base sm:text-lg text-white max-w-xs sm:max-w-md text-center mb-16">
        studi yang diinisiasi oleh <b>Natural Language Processing Group FMIPA UGM</b> mengenai deteksi clickbait 
        secara otomatis dengan <i>Artificial Intelligence</i>
    </p>
</div>
<div class="flex flex-col items-center md:flex-row bg-dark-7 p-8 sm:p-16 justify-center space-y-16 md:space-x-16 lg:space-x-32">
    <div class="flex flex-col">
        <h1 class="font-bold text-white text-3xl font-serif text-center md:text-left">Apa itu clickbait?</h1>
        <p class="mt-4 font-sans text-gray-300 md:max-w-sm text-xl">
            Clickbait merupakan sebuah cara untuk menarik pembaca atau web visitor dengan membuat judul artikel 
            yang menarik. Cara ini banyak digunakan media online dan fenomena-nya telah banyak ditemukan di 
            sosial media. 
        </p>
        <p class="mt-3 font-sans text-gray-300 md:max-w-sm text-xl">
            Akan tetapi, clickbait sering disalahgunakan, karena judul artikel yang menarik seringkali tidak 
            relevan dengan isi berita atau berita yang disajikan tidak berisi fakta yang benar. Hal ini bisa 
            menyebabkan experience yang tidak menyenangkan dari sisi pembaca dan pada akhirnya mengurangi 
            engagement pembaca ke sebuah media.
        </p>
    </div>
    <div class="flex font-serif text-dark-8 flex-col bg-gray-300 max-w-xs p-5 rounded-lg shadow-2xl space-y-6 contoh">
        <h1 class="font-bold text-3xl">Contoh</h1>
        <span class="font-light text-base sm:text-lg">
            <i>“Viral! Driver Ojol di Bekasi Antar Pesanan Makanan Pakai Sepeda”</i>
        </span>
        <span class="font-light text-base sm:text-lg">
            <i>“Ada Motor Nyangkut di Atas Bambu di Sleman, Kok Bisa?”</i>
        </span>
        <span class="font-light text-base sm:text-lg">
            <i>“Seorang Pria Depresi Bakar Mobilnya Sendiri di Tempat Pembuangan Akhir”</i>
        </span>
    </div>
</div>
<div class="flex flex-col space-y-16 lg:flex-row lg:justify-center lg:space-x-32 bg-dark-8 items-center p-8 sm:p-20">
    <div class="flex flex-col items-center space-y-10">
        <h1 class="text-3xl sm:text-4xl text-white font-serif font-bold text-center">Ingin membantu kami?</h1>
        <p 
            class="text-base sm:text-xl text-gray-200 max-w-3xl lg:max-w-sm lg:self-start lg:text-left 
            text-center font-serif"
        >
            Melalui website ini, kami meminta kesediaan anda untuk berpartisipasi dalam proses 
            <span class="font-bold text-accent-3">anotasi/pelabelan</span>
            dari headline/judul artikel yang telah kami kumpulkan dari berbagai media online di Indonesia. Hasil dari 
            pelabelan ini, diharapkan dapat membuat deteksi clickbait semakin akurat.
        </p>
        <a 
            class="bt hover:bg-accent-7 px-8 py-4 font-bold font-sans"
            href="app"
            rel= prefetch
        >
            Mulai melabel
        </a>

    </div>
    <Leaderboard />
</div>

<style type="text/postcss">
    .contoh {
        height: fit-content;
    }
</style>

<script>
    import Leaderboard from "../components/Leaderboard.svelte";
    import { landing } from "../stores.js";
</script>