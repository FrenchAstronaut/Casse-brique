<?php
$result = array();
try {
    $dbh = new PDO('mysql:host=localhost;dbname='65149', '65149', '';
    $dbh->prepare('SELECT * FROM users');
    $dbh->execute();
    $result = $dbh->fetch(PDO::FETCH_ASSOC);
    unset($dbh);
} catch (PDOException $e) {
	print "Erreur !: " . $e->getMessage() . "<br/>";
	die();
}
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Projet</title>
		<link rel="stylesheet" type="text/css" href="web/css/style.css">
	</head>
	<body>
		<header>
			<h1 id="page-title">
				Bienvenue <?php if(isset($result['firstname'])) {
					echo $result['firstname']
					}
				 ?>
			</h1>
			<nav class="menu-nav">
				<ul>
					<li>
						<a href="#">
							Acceuil
						</a>
					</li>
					<li>
						<a href="jeu.html">
							Jeu
						</a>
					</li>
					<li>
						<a href="user.html">
							User
						</a>
					</li>
				</ul>
			</nav>
		</header>
		<main>
			
		</main>
		<footer>
			<p>
				Copyright &copy; Moi - 2019-2020 - All Right Reserved
			</p>
		</footer>
	</body>
</html>
