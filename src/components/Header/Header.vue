<script setup lang="ts">
import './Header.scss'
const balance = 10000;
const nickName = 'Иванов Иван'

const handleNumberToRanges = (number: number): string => {
    if (!Number.isFinite(number)) {
        return '0';
    }
    return new Intl.NumberFormat('ru-RU').format(number);
}
</script>

<template>
    <header>
        <div class="logo-container">
            <p>ПРАВО-Видeние</p>
        </div>
        <nav>
            <button>
                Найти юриста
            </button>
            <button>
                Задать вопрос
            </button>
        </nav>
        <div class="lk">
            <button>
                {{ handleNumberToRanges(balance) }} ₽
            </button>
            <div class="lk-profile">
                <div class="img-wrapper">

                </div>
                <p>
                    {{ nickName }}
                </p>
            </div>
        </div>
    </header>
</template>