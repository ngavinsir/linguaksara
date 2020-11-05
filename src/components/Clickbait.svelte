<div transition:slide={{duration:150}} class="footer">
    <Bt 
        customClass="gray w-32 sm:w-40 mx-2 my-1 sm:mx-6" 
        on:click={() => sendLabel("NotClickbait")}
        disabled={!$article || loading}
        loading={loading === "NotClickbait"}
        value="Not Clickbait"
    />
    <Bt
        customClass="white w-32 sm:w-40 mx-2 my-1 sm:mx-6"
        on:click={() => openClickbaitSelector()}
        disabled={!$article || loading}
        loading={loading === "Clickbait"}
        value="Clickbait"
    />
</div>

<svelte:window on:keydown={handleKeydown}/>

<script>
    import Bt from "./Button.svelte";
    import ClickbaitSelector from "./ClickbaitSelector.svelte";
    import { getContext, createEventDispatcher } from "svelte";
    import { history, article, doneOnboarding, modal } from "../stores.js";
    import { slide } from "svelte/transition";
    const dispatch = createEventDispatcher();

    const { axios } = getContext("axios");
    const { show: showNotification } = getContext("notification");
    const { open: openModal, close: closeModal } = getContext("simple-modal");
    let loading = null;

    $: if($modal && $modal.event == 'clickbaitSelector') {
        closeModal();
        sendLabel("Clickbait", $modal.payload);
        $modal = null;
    }

    function openClickbaitSelector() {
        openModal(ClickbaitSelector, {tokens: $article.headline.split(" ")}, {
            closeButton: false,
            styleWindow: {
                backgroundColor: '#272727', 
                width: '425px',
                maxWidth: '100%'
            }
        })
    } 

    async function sendLabel(label, keywords) {
        if(loading) return;
        loading = label;
        const url = `/clickbait/labeling`;
        const data = {
            value: label,
            article_id: $article.id,
            keywords
        };
        try {
            const { data: { error, label_id, new_article } } = await axios.post(url, data)
            if(!error)  { 
                history.add({ 
                    label: {
                        id: label_id,
                        value: label,
                        updated_at: new Date().toISOString()
                    },
                    keywords,
                    article: $article,
                })
                $article = new_article;
                if(!$doneOnboarding) {
                    $doneOnboarding = true;
                }
            } else {
                dispatch("retry");
                showNotification("Terjadi kesalahan, silahkan coba lagi", 3000);
            }
        } catch (e) {
            console.log(e);
            // handle send label error
        } finally {
            loading = null;
        }
    }

    async function handleKeydown(event) {
        if(event.keyCode === 65) await sendLabel("NotClickbait");
        else if(event.keyCode === 76) await sendLabel("Clickbait");
        else return;
    }
</script>


    
