<script>
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-nocheck
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	export let countCourses;

	let chart;
	// const dataValues = Object.values(countCourses);

	const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const sortedData = daysOrder.map((day) => {
		const found = countCourses.find((d) => d.day_of_week.trim() === day);
		return found ? found.lesson_count : 0;
	});
	const labels = daysOrder;
	const data = sortedData;

	const minValue = Math.min(...data);
	const maxValue = Math.max(...data);

	onMount(() => {
		const ctx = document?.getElementById('radarChart')?.getContext('2d');
		chart = new Chart(ctx, {
			type: 'radar',
			data: {
				labels,
				datasets: [
					{
						label: 'Weekly Progress',
						data,
						fill: true,
						backgroundColor: 'rgba(79, 70, 229, 0.2)',
						borderColor: 'rgb(79, 70, 229)',
						pointBackgroundColor: 'rgb(79, 70, 229)',
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: 'rgb(79, 70, 229)'
					}
				]
			},
			options: {
				scales: {
					r: {
						angleLines: {
							display: false
						},
						grid: {
							display: false
						},
						pointLabels: {
							font: {
								size: 12,
								family: 'inter'
							},
							color: 'rgba(255, 255, 255, 0.8)'
						},
						ticks: {
							display: false,
							beginAtZero: true,
							min: minValue,
							max: maxValue,
							stepSize: 1
						}
					}
				},
				elements: {
					line: {
						tension: 0.3
					}
				},
				plugins: {
					filler: {
						propagate: false
					},
					legend: {
						labels: {
							usePointStyle: true,
							pointStyle: 'dash',
							font: {
								size: 16,
								family: 'inter'
							},
							color: 'rgba(255, 255, 255, 0.8)'
						}
					},
					'samples-filler-analyser': {
						target: 'chart-analyser'
					}
				},
				interaction: {
					intersect: false
				}
			}
		});
	});

	// Cleanup the chart to prevent memory leaks
	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<canvas id="radarChart" class="h-full max-h-80"></canvas>
